function Footer() {
    return (
        <footer className="py-16 bg-sand border-t border-charcoal/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-2">
                        <div className="bg-charcoal p-1.5 rounded-lg text-white">
                            <span className="material-symbols-outlined block text-xl font-bold">verified_user</span>
                        </div>
                        <h2 className="text-2xl font-extrabold tracking-tight text-charcoal">C3A</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-10 text-[10px] font-bold uppercase tracking-widest text-charcoal/50">
                        <a className="hover:text-saffron transition-colors cursor-pointer" href="#">Support</a>
                        <a className="hover:text-saffron transition-colors cursor-pointer" href="#">Privacy</a>
                        <a className="hover:text-saffron transition-colors cursor-pointer" href="#">Terms</a>
                        <a className="hover:text-saffron transition-colors cursor-pointer" href="#">Contact</a>
                    </div>
                    <div className="flex gap-4">
                        <a className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/50 hover:bg-white transition-all cursor-pointer" href="#">
                            <span className="material-symbols-outlined text-lg">public</span>
                        </a>
                        <a className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/50 hover:bg-white transition-all cursor-pointer" href="#">
                            <span className="material-symbols-outlined text-lg">mail</span>
                        </a>
                    </div>
                </div>
                <div className="text-center mt-16 pt-8 border-t border-charcoal/5 text-[10px] font-bold uppercase tracking-widest text-charcoal/30">
                    © 2024 C3A PLATFORM. ALL RIGHTS RESERVED. EMPOWERING THE CREATOR ECONOMY.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
