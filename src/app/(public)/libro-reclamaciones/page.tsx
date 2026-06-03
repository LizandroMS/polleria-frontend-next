import { ReclamationForm } from '@/features/legal/components/reclamation-form';
import { companyInfo } from '@/features/legal/constants/company-info';

export default function LibroReclamacionesPage() {
  return (
    <div className="page-shell">
      <div className="app-container py-10">
      <section className="mb-8 max-w-4xl">
        <span className="chip-soft">Atención al consumidor</span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl" style={{ color: 'var(--dark)' }}>
          Libro de Reclamaciones Virtual
        </h1>
        <p className="mt-4 text-base leading-8" style={{ color: 'var(--text-soft)' }}>
          Registra aquí tu reclamo o queja relacionado con los productos, servicios o atención
          brindada por {companyInfo.commercialName}. Al enviar el formulario se generará una
          constancia en PDF para descargar.
        </p>
      </section>

      <ReclamationForm />
      </div>
    </div>
  );
}
