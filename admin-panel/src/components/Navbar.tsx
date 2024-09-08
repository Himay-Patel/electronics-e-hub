const Navbar = () => {
    return (
        <header className="bg-e_hub_light_black text-e_hub_white p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">E-hub</h1>
                <div className="space-x-4">
                    <button className="text-e_hub_light_gray hover:text-e_hub_white">Profile</button>
                    <button className="text-e_hub_light_gray hover:text-e_hub_white">Logout</button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
