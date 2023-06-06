export default function Dummy() {
	const bg =
		"bg-blue bg-orange bg-black bg-white bg-green bg-purple bg-yellow bg-red bg-cyan bg-gray-100 bg-gray-200 bg-gray-300 bg-gray-400 bg-gray-500 ";
	const bg10 =
		"bg-blue/10 bg-orange/10 bg-black/10 bg-white/10 bg-green/10 bg-purple/10 bg-yellow/10 bg-red/10 bg-cyan/10 bg-gray-100/10 bg-gray-200/10 bg-gray-300/10 bg-gray-400/10 bg-gray-500/10 ";
	const bg30 =
		"bg-blue/30 bg-orange/30 bg-black/30 bg-white/30 bg-green/30 bg-purple/30 bg-yellow/30 bg-red/30 bg-cyan/30 bg-gray-100/30 bg-gray-200/30 bg-gray-300/30 bg-gray-400/30 bg-gray-500/30 ";
	const bg50 =
		"bg-blue/50 bg-orange/50 bg-black/50 bg-white/50 bg-green/50 bg-purple/50 bg-yellow/50 bg-red/50 bg-cyan/50 bg-gray-100/50 bg-gray-200/50 bg-gray-300/50 bg-gray-400/50 bg-gray-500/50 ";
	const bg70 =
		"bg-blue/70 bg-orange/70 bg-black/70 bg-white/70 bg-green/70 bg-purple/70 bg-yellow/70 bg-red/70 bg-cyan/70 bg-gray-100/70 bg-gray-200/70 bg-gray-300/70 bg-gray-400/70 bg-gray-500/70 ";
	const bg90 =
		"bg-blue/90 bg-orange/90 bg-black/90 bg-white/90 bg-green/90 bg-purple/90 bg-yellow/90 bg-red/90 bg-cyan/90 bg-gray-100/90 bg-gray-200/90 bg-gray-300/90 bg-gray-400/90 bg-gray-500/90 ";

	const bg10_after =
		"after:bg-blue/10 after:bg-orange/10 after:bg-black/10 after:bg-white/10 after:bg-green/10 after:bg-purple/10 after:bg-yellow/10 after:bg-red/10 after:bg-cyan/10 after:bg-gray-100/10 after:bg-gray-200/10 after:bg-gray-300/10 after:bg-gray-400/10 after:bg-gray-500/10 ";

	const border =
		"border-blue border-orange border-black border-white border-green border-purple border-yellow border-red border-cyan border-gray-100 border-gray-200 border-gray-300 border-gray-400 border-gray-500 ";
	const text =
		"text-blue text-orange text-black text-white text-green text-purple text-yellow text-red text-cyan text-gray-100 text-gray-200 text-gray-300 text-gray-400 text-gray-500 ";

	return (
		<div
			className={
				bg +
				bg10 +
				bg30 +
				bg50 +
				bg70 +
				bg90 +
				bg10_after +
				border +
				text +
				"absolute invisible"
			}>
			Dummy
		</div>
	);
}
