// Human page entry.

const AppHuman = () => (
  <main className="page-human">
    <HeroHuman/>
    <AboutHuman/>
    <HobbyCollage/>
    <ContactsHuman/>
    <Footer/>
  </main>
);

const rootH = ReactDOM.createRoot(document.getElementById("app"));
rootH.render(<AppHuman/>);
