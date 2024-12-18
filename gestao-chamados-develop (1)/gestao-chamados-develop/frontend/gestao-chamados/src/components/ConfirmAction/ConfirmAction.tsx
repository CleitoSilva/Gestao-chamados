import "./ConfirmAction.css";

interface IConfirmAction {
  title: string;
  text: string;
  confirmColor?: string;
  cancelColor?: string;
  action: () => void;
  close: () => void;
}

function ConfirmAction({ title, text, confirmColor, cancelColor, action, close }: IConfirmAction) {
	return (
		<section className="confirm-action-container">
			<header className="confirm-action-header">
				<h2>
					{title}
				</h2>
				<button className="close" onClick={close}>
          &times;
				</button>
			</header>
			<article>
				<p>{text}</p>
			</article>
			<footer className="confirm-action-footer">
				<button onClick={close} style={{ background: cancelColor ? cancelColor : "black" }}>
          Cancelar
				</button>
				<button onClick={action} style={{ background: confirmColor ? confirmColor : "black" }}>
          Confirmar
				</button>
			</footer>
		</section>
	);
}

export default ConfirmAction;