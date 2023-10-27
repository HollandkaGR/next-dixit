import Link from 'next/link';

const Navigation = () => {
    const navitems = [
        { name: 'Home', path: '/' },
        { name: 'Interview', path: '/interview' },
        { name: 'Counter', path: '/counter' },
        { name: 'Sudoku', path: '/sudoku' },
    ];

    return (
        <>
            <nav className="bg-navBg text-white flex flex-row justify-between items-center p-5">
                <div className="text-2xl font-bold flex-1 cursor-pointer">Logo</div>
                <div className="flex flex-row justify-center items-center gap-5 flex-1">
                    {navitems.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={item.path}
                                className="hover:text-primary-200 w-24 text-center border-2 rounded-full  border-solid  transition-all duration-500 border-white/30 hover:border-primary-300 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] shadow-black hover:shadow-none">
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
                <div className="flex flex-row justify-end items-center gap-5 flex-1">
                    <a
                        href="/login"
                        className="hover:text-primary-200">
                        Login
                    </a>
                    <a
                        href="/register"
                        className="hover:text-primary-200">
                        Register
                    </a>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
