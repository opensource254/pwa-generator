// Black or white always provides at least 4.5:1 against an opaque sRGB color.
export const contrastInk = (hex) => {
	const raw = /^#([\da-f]{3}|[\da-f]{6})$/i.test(hex) ? hex.slice(1) : '1f9d6a'
	const full = raw.length === 3 ? [...raw].map(ch => ch + ch).join('') : raw
	const channels = full.match(/../g).map((channel) => {
		const value = Number.parseInt(channel, 16) / 255
		return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
	})
	const luminance = channels.reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0)
	return luminance > 0.179 ? '#000000' : '#ffffff'
}
