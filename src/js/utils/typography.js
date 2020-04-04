import Typography from "typography"
import noriegaTheme from "typography-theme-noriega"

const typography = new Typography(noriegaTheme)

// Export helper functions
export const { scale, rhythm, options } = typography
export default typography