import estilos from "./Rodape.module.scss";

const NavBar = () => {
  return (
    <footer className={estilos.Rodape}>
      <div>
        <p>Feito durante Curso da Alura &copy; {new Date().getFullYear()} </p>
      </div>
      <div>
        <ul className="social-icons">
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=100001247365604"
              target="__blank"
            >
              <i className="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/pedro-xavier-coelho-7066b3a2/"
              target="__blank"
            >
              <i className="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href={"https://github.com/pedroxc/"} target="__blank">
              <i className="fa fa-github"></i>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p>
          Desenvilvido por{" "}
          <a
            style={{
              color: "white",
              fontWeight: "bold",
              textDecoration: "none",
            }}
            href={"https://github.com/pedroxc/"}
            target="__blank"
          >
            Pedro Xavier Coelho
          </a>
        </p>
      </div>
    </footer>
  );
};

export default NavBar;
