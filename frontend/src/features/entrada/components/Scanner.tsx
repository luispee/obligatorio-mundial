import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef } from 'react';
import { ValidarEntradaRequest } from '../api/entradaRequests';

type ScannerProps = {
  onScan: (data: ValidarEntradaRequest) => void;
};

export default function Scanner({ onScan }: ScannerProps) {
  const scannedRef = useRef(false);

  useEffect(() => {
    const scanner = new Html5Qrcode('reader');
    let isRunning = false;

    scanner
      .start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          // evitar múltiples scans
          if (scannedRef.current) return;
          scannedRef.current = true;

          try {
            await scanner.stop();
            await scanner.clear();
            isRunning = false;

            onScan({ token_entrada: decodedText });
          } catch (err) {
            console.error(err);
          }
        },
        () => {}
      )
      .then(() => {
        isRunning = true;
      })
      .catch((err) => {
        console.error('Error starting scanner:', err);
      });

    return () => {
      if (isRunning) {
        scanner
          .stop()
          .then(() => scanner.clear())
          .catch(console.error);
      }
    };
  }, [onScan]);

  return <div id="reader" className="w-full max-w-lg h-[300px]" />;
}
