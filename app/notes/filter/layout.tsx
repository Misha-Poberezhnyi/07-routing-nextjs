import css from './LayoutNotes.module.css';

type NotesLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  return (
    <section>
      <div className={`${css.container}`}>
        <aside className={css.sidebar}>{sidebar}</aside>
        {children}
      </div>
    </section>
  );
}
