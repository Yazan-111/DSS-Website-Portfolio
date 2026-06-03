export default function ContactPage() {
  return (
    <div className="flex flex-col items-center min-h-screen py-10 px-4">
      <iframe
        width="100%"
        height="900"
        style={{ maxWidth: "800px", border: "none" }}
                src="https://docs.google.com/forms/d/e/1FAIpQLSfSfqcehEgwgyfegruOFs2jVGFRYX5nIywuToSFSRxIBKcfBA/viewform?embedded=true"
      >
        جاري التحميل...
      </iframe>
    </div>
  );
}
