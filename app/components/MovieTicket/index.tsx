const MovieTicket = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Movie Title</h2>
        <p className="text-sm">Date: 01/01/2022</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm">Cinema: Cinema Name</p>
        <p className="text-sm">Time: 8:00 PM</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm">Seat: A1</p>
        <p className="text-sm">Screen: Screen 1</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm">Price: $10.00</p>
        <p className="text-sm">Booking ID: 123456789</p>
      </div>
      <div className="flex justify-center items-center gap 2">
        <img src="/logo.png" alt="Movie Poster" className="w-24 mr-4" />
        <div className="">
          <p className="text-sm font-bold">©️ KBCシネマ1・2</p>
          <p className="text-sm">
            〒810‐0071 <br />
            福岡市中央区那の津1‐3‐21 <br />
            TEL.092-751-4268 <br />
            FAX.092-712-8229
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieTicket
