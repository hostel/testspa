import React, {useEffect} from 'react';

type HandlerType = () => void;

/**
 * Hook for click outside in dropdown
 *
 * @param {React.RefObject<HTMLDivElement>} ref - ref link on element
 * @param {HandlerType} handler - hnadler for call
 */
export const useOnClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: HandlerType) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler();
        };

        document.addEventListener('mousedown', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, handler]);
};
