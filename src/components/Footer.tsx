import Styles from './Footer.module.css'

const Footer = () => (
  <footer className={Styles.footer}>
    <span className="text-xs">
      Copyright {process.env.NEXT_PUBLIC_SITE_TITLE}
    </span>
  </footer>
)

export default Footer
