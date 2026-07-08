const Footer = ({ gameCount, isConnected }) => {
    return (
        <footer className="footer-content">
            <p className="status-text"><span className={`status ${isConnected ? "online" : "offline" }`}></span> Connected</p>
            <p className="game-counter">{gameCount} game(s)</p>
        </footer>
    )
}

export default Footer;