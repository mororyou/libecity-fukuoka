const Footer = () => (
  <footer className="flex h-12 mt-8 items-center justify-center bg-themeMainColor py-8 font-bold text-white">
    <span className="text-xs">
      Copyright {process.env.NEXT_PUBLIC_SITE_TITLE}
    </span>
  </footer>
)

export default Footer
