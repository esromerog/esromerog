export default function LinkButton(props) {
    return <a href={props.href} target={props?.target || "_blank"} className="button-primary">{props.children}</a>
}