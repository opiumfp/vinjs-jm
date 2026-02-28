interface Props {
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
}

export default function PageTitle({ title, subtitle, id, className }: Props) {
  return (
    <div className={`page-title text-center${className ? ' ' + className : ''}`} id={id}>
      {title && <h2 className="h2">{title}</h2>}
      {subtitle && <h4 className="h5">{subtitle}</h4>}
    </div>
  );
}
