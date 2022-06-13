import { useCallback, useEffect, useState } from 'react';
import { subscribe, unsubscribe } from './resources/API';

const DEFAULT_MESSAGE = -1;

export function Effects({ sourceId }: { sourceId: string }) {
    const [message, setMessage] = useState(DEFAULT_MESSAGE);
    const callback = useCallback((payload) => {
        setMessage(payload);
    }, []);
    useEffect(() => {
        subscribe(sourceId, callback);
        return () => {
            unsubscribe(sourceId, callback);
            setMessage(DEFAULT_MESSAGE);
        };
    }, [sourceId, callback]);
    return (
        <div>
            {sourceId}: {message}
        </div>
    );
}
