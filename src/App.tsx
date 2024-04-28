import React from 'react';
import './App.css';
import {useActiveVkuiLocation, useGetPanelForView} from "@vkontakte/vk-mini-apps-router";
import {Panel, Root, View} from "@vkontakte/vkui";
import News from "./pages/news";
import ItemPage from "./pages/itemPage"

function App() {
    const {view: activeView} = useActiveVkuiLocation() as { view: string };
    const activePanel = useGetPanelForView('default_view') as string;

    return (
        <Root activeView={activeView}>
            <View nav="news" activePanel={activePanel}>
                <Panel nav="main_page"><News/></Panel>
                <Panel nav="item_page"><ItemPage/></Panel>
            </View>
        </Root>
    )
}

export default App;
