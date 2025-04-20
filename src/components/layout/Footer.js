export default function Footer(){
    return <>
   <footer className="bg-dark text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="font-bold text-lg">Website Generator</p>
            <p className="text-sm text-gray-300">Create custom websites in minutes</p>
          </div>
          <div className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Website Generator. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
    </>
}