import Typography from "typography"
import irvingTheme from "typography-theme-irving"

const typography = new Typography(irvingTheme)

// Export helper functions
export const { scale, rhythm, options } = typography
export default typography