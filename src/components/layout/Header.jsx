const Header = () => {
  return (
    <header className="flex justify-between px-10 py-8">
      <h2 className="text-2xl font-bold tracking-wide">Balance: $25</h2>

      <a href="/" class="flex space-x-3 items-center font-medium text-gray-600">
        <span>rezaiimohammad00@gmail.com</span>
        <img
          alt="profil"
          src="/assets/profile-pic-office.png"
          class="mx-auto object-cover rounded-full h-10 w-10 "
        />
      </a>
    </header>
  );
};

export default Header;
