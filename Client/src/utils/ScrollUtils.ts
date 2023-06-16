// Custom Scroll Functions
export const scrollToEnd = (containerRef: React.RefObject<HTMLDivElement>) => {
	if (containerRef.current) {
		containerRef.current.scrollTo({
			top: containerRef.current.scrollHeight,
			behavior: "smooth"
		});
	}
};

export const scrollToMessage = (id: string, containerRef: React.RefObject<HTMLDivElement>) => {
	const component = document.getElementById(id);
	if (!component) return;

	const dist = component.getBoundingClientRect().top;

	if (containerRef.current) {
		containerRef.current.scrollTo({
			top: containerRef.current.scrollTop + dist - 60,
			behavior: "smooth"
		});
	}
};
