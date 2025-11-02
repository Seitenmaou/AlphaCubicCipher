import { useEffect, useMemo, useState } from 'react';
import { cipherAlgorithms, cipherMetadata } from './utils/dualKeyCipher';
import './App.css';

function App() {
  const [plainText, setPlainText] = useState('');
  const [cipherKey, setCipherKey] = useState('');
  const [output, setOutput] = useState('');
  const [isCipherMode, setIsCipherMode] = useState(true);
  const [cipherType, setCipherType] = useState('dualKeyCipher');
  const [error, setError] = useState(null);

  const cipherOptions = useMemo(() => Object.keys(cipherMetadata), []);
  const formatCipherLabel = (value) => {
    const customLabel = cipherMetadata[value]?.label;
    if (customLabel) {
      return customLabel;
    }
    return value.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const { requiresKey = true, supportsDecipher = true } = cipherMetadata[cipherType] ?? {};

    if (!requiresKey) {
      setCipherKey('');
    }

    if (!supportsDecipher) {
      setIsCipherMode(true);
    }

    setError(null);
    setOutput('');
  }, [cipherType]);

  useEffect(() => {
    if (!plainText) {
      setOutput('');
      setError(null);
      return undefined;
    }

    const metadata = cipherMetadata[cipherType] ?? {};

    if (metadata.supportsDecipher === false && !isCipherMode) {
      setOutput('');
      setError('Selected cipher only supports encryption.');
      return undefined;
    }

    const timer = setTimeout(() => {
      const algorithm = cipherAlgorithms[cipherType];

      if (!algorithm) {
        setOutput('');
        setError('Selected cipher is not available.');
        return;
      }

      try {
        const result = algorithm(plainText, cipherKey, isCipherMode);
        setOutput(result ?? '');
        setError(null);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred.');
        setOutput('');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [plainText, cipherKey, isCipherMode, cipherType]);

  const handleToggleMode = () => {
    const {
      supportsDecipher = true,
    } = cipherMetadata[cipherType] ?? {};
    if (!supportsDecipher) {
      return;
    }

    const nextMode = !isCipherMode;
    setIsCipherMode(nextMode);

    if (!plainText) {
      setOutput('');
      setError(null);
      return;
    }

    const algorithm = cipherAlgorithms[cipherType];

    if (!algorithm) {
      setOutput('');
      setError('Selected cipher is not available.');
      return;
    }

    try {
      const result = algorithm(plainText, cipherKey, nextMode);
      setOutput(result ?? '');
      setError(null);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      setOutput('');
    }
  };

  const {
    requiresKey = true,
    supportsDecipher = true,
  } = cipherMetadata[cipherType] ?? {};

  return (
    <div className="app">
      <div className="control-row">
        <label className="cipher-select" htmlFor="cipherType">
          <span>Cipher Type</span>
          <select
            id="cipherType"
            value={cipherType}
            onChange={(event) => setCipherType(event.target.value)}
          >
            {cipherOptions.map((option) => (
              <option key={option} value={option}>
                {formatCipherLabel(option)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="container">
        <textarea
          aria-label="Plain text input"
          placeholder="Input 1..."
          value={plainText}
          onChange={(event) => setPlainText(event.target.value)}
        />
        {requiresKey ? (
          <textarea
            aria-label="Cipher key input"
            placeholder="Input 2..."
            value={cipherKey}
            onChange={(event) => setCipherKey(event.target.value)}
          />
        ) : null}
        <textarea
          aria-label="Output"
          placeholder="Output..."
          value={output}
          readOnly
          className="output-field"
        />
      </div>
      <button
        className={`mode-button${isCipherMode ? '' : ' mode-decipher'}`}
        onClick={handleToggleMode}
        type="button"
        disabled={!supportsDecipher}
      >
        {supportsDecipher ? (isCipherMode ? 'Cipher' : 'Decipher') : 'Cipher Only'}
      </button>
      {error ? <p className="error-message">{error}</p> : null}
      {!supportsDecipher ? (
        <p className="info-message">
          {formatCipherLabel(cipherType)} uses the message as its own key and currently supports
          encryption only.
        </p>
      ) : null}
    </div>
  );
}

export default App;
