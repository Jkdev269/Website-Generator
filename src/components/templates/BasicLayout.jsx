import Header from '../core/Header';
import Footer from '../core/Footer';

export default function BasicLayout({ 
  children, 
  headerProps = {}, 
  footerProps = {},
  pageTitle = "My Website"
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header {...headerProps} />
      
      <main className="flex-grow pt-16">
        {children}
      </main>
      
      <Footer {...footerProps} />
    </div>
  );
}