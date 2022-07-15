import classes from '../styles/Layout.module.css'
import Nav from "./Nav"
export default function Layout({children}){
    console.log('layout rendered')
    return(
        <>
        <Nav/>
        <main className={classes.main}>
            <div className={classes.container}>
                {children}
            </div>
        </main>
        </>
    )
}