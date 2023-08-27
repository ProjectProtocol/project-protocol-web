import { Link } from "react-router-dom"

type FooterLink = {
    url: string,
    label: string
}
const links = [
    {url: '#', label: "About"},
    {url: '#', label: "How does it work?"},
    {url: '#', label: "Ethical principles"},
    {url: '#', label: "Terms of service"},
    {url: '#', label: "Contact us"},
]

export default function Footer() {
 return (
     <div className="bg-primary text-center py-4">
        {links.map(({ label, url}: FooterLink) => (
            <Link 
                key={`footer-link-${label}`} 
                className="me-5 text-body d-block d-md-inline my-3"
                to={url}>
                {label}
            </Link>
        ))}
     </div>
 )   
}