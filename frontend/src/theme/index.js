import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
	},

	styles: {
		global: {
			body: {
				bg: "#0f1220",
				color: "whiteAlpha.900",
			},
		},
	},

	colors: {
		brand: {
			50: "#f3e8ff",
			100: "#e9d5ff",
			200: "#d8b4fe",
			300: "#c084fc",
			400: "#a855f7",
			500: "#8b5cf6",
			600: "#7c3aed",
			700: "#6d28d9",
			800: "#5b21b6",
			900: "#4c1d95",
		},
		surface: {
			50: "#161a2b",
			100: "#1b2136",
			200: "#232b45",
			300: "#2b3554",
		},
	},

	components: {
		Button: {
			baseStyle: {
				fontWeight: "semibold",
				borderRadius: "md",
			},
			defaultProps: {
				colorScheme: "brand",
			},
			variants: {
				solid: (props) => ({
					bg: `${props.colorScheme}.500`,
					color: "white",
					_hover: { bg: `${props.colorScheme}.600` },
					_active: { bg: `${props.colorScheme}.700` },
				}),
				outline: () => ({
					border: "1px solid",
					borderColor: "whiteAlpha.300",
					color: "white",
					bg: "transparent",
					_hover: {
						bg: "whiteAlpha.100",
						borderColor: "whiteAlpha.500",
					},
					_active: {
						bg: "whiteAlpha.200",
					},
				}),
				ghost: () => ({
					color: "whiteAlpha.900",
					_hover: { bg: "whiteAlpha.100" },
					_active: { bg: "whiteAlpha.200" },
				}),
			},
		},

		Input: {
			defaultProps: {
				variant: "outline",
			},
			variants: {
				outline: {
					field: {
						bg: "whiteAlpha.50",
						borderColor: "whiteAlpha.300",
						color: "white",
						_placeholder: {
							color: "whiteAlpha.500",
						},
						_hover: {
							borderColor: "whiteAlpha.400",
						},
						_focusVisible: {
							borderColor: "brand.500",
							boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
						},
					},
				},
			},
		},

		Select: {
			defaultProps: {
				variant: "outline",
			},
			variants: {
				outline: {
					field: {
						bg: "whiteAlpha.50",
						borderColor: "whiteAlpha.300",
						color: "white",
						_placeholder: {
							color: "whiteAlpha.500",
						},
						_hover: {
							borderColor: "whiteAlpha.400",
						},
						_focusVisible: {
							borderColor: "brand.500",
							boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
						},
					},
					icon: {
						color: "whiteAlpha.700",
					},
				},
			},
		},

		Textarea: {
			defaultProps: {
				variant: "outline",
			},
			variants: {
				outline: {
					bg: "whiteAlpha.50",
					borderColor: "whiteAlpha.300",
					color: "white",
					_placeholder: {
						color: "whiteAlpha.500",
					},
					_hover: {
						borderColor: "whiteAlpha.400",
					},
					_focusVisible: {
						borderColor: "brand.500",
						boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
					},
				},
			},
		},
	},
});

export default theme;