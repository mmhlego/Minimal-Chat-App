import { useEffect, useState, useMemo, useRef } from "react";

export function useIsVisible<T>(): [React.RefObject<T>, boolean] {
	const [isIntersecting, setIntersecting] = useState(false);
	const ref = useRef<HTMLElement>(null);

	const observer = useMemo(
		() => new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting)),
		[ref]
	);

	useEffect(() => {
		if (ref?.current) {
			observer.observe(ref.current);
			return () => observer.disconnect();
		}
	}, [ref]);

	return [ref as React.RefObject<T>, isIntersecting];
}
