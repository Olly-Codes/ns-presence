const Footer = ({ gameCount }) => {
    return (
        <footer className="footer-content">
            <p className="status-text">Connected <span className="status"></span></p>
            <p className="game-counter">{gameCount} game(s)</p>
        </footer>
    )
}

export default Footer;