const Header = () => {
  return (
    <header className="flex justify-between px-10 py-8">
      <h2 className="text-2xl font-bold tracking-wide text-dark">Balance: $25</h2>

      <a href="/" className="flex items-center space-x-3 font-medium text-gray-600">
        <span>rezaiimohammad00@gmail.com</span>
        <img
          alt="profil"
          src="/assets/profile-pic-office.png"
          className="object-cover w-10 h-10 mx-auto rounded-full "
        />
      </a>
    </header>
  );
};

export default Header;
