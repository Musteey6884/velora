export default function Footer(){
  return (
    <footer className="surface mt-10 border-t border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <div className="muted">© {new Date().getFullYear()} Velora — Where living meets lifestyle</div>
      </div>
    </footer>
  )
}
