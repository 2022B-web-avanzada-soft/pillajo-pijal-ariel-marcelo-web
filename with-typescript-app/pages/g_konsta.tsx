import {App, BlockTitle, List, ListItem, Navbar, Page} from "konsta/react";
export default function (){
    return(
        <>
            <App theme="ios"> {/* SI en lugar de ios pongo material, paso a utilizar estilos de otra libreria*/}
                <Page>
                    <Navbar title="list"/>
                    <BlockTitle>Links, Headers, Footer</BlockTitle>
                    <List strongIos outlineIos>
                        <ListItem
                            link
                            header="Name"
                            title="John Doe"
                            after="Edit"
                        />
                    </List>
                </Page>
            </App>
        </>
    )
}
