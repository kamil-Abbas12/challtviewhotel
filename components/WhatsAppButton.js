// components/WhatsAppButton.js

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923110866930?text=Hi, I'm interested in booking a room at your hotel"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 cursor-pointer"
    >
      <img
        src="/whatsapp.png" 
        width={28} // put this icon in your /public folder
        alt="WhatsApp"
        className="w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-all"
      />
    </a>
  );
}
