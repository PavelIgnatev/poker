import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useUnmount } from "react-use";

export type IntervalWorkerHandler = () => void;
export type IntervalWorkerId = string;
export type IntervalWorkerTimeout = number;

const handlers: Record<IntervalWorkerId, IntervalWorkerHandler> = {};

const createIntervalWorker = () => {
  const blob = new Blob([
    `let intervalById = {};
        onmessage = function ({data: { name, timeout, id }}) {
            switch (name) {
                case 'setInterval':
                    intervalById[id] = setInterval(function () {
                        postMessage({ id });
                    }, timeout);
                    break;
                case 'clearInterval':
                    if (intervalById.hasOwnProperty(id)) {
                        clearInterval(intervalById[id]);
                        delete intervalById[id];
                    }
                    break;
            }
        };
    `,
  ]);

  const workerScript = URL.createObjectURL(blob);

  const worker = new Worker(workerScript);

  worker.onmessage = ({ data: { id } }) => {
    if (id in handlers) {
      handlers[id]();
    }
  };

  return worker;
};

const worker = createIntervalWorker();

export const useIntervalWorker = () => {
  const setIntervalWorker = useCallback(
    (handler: IntervalWorkerHandler, timeout: IntervalWorkerTimeout) => {
      if (!worker) {
        return;
      }

      const id = nanoid();
      handlers[id] = handler;
      worker.postMessage({
        name: "setInterval",
        timeout,
        id,
      });

      return id;
    },
    []
  );

  const clearIntervalWorker = useCallback((id: IntervalWorkerId) => {
    if (!worker) {
      return;
    }
    delete handlers[id];
    worker.postMessage({
      name: "clearInterval",
      id,
    });
  }, []);

  const clearAllIntervals = useCallback(() => {
    Object.keys(handlers).forEach((id) => {
      clearIntervalWorker(id);
    });
  }, [clearIntervalWorker]);

  useUnmount(clearAllIntervals);

  return { setIntervalWorker, clearIntervalWorker };
};
