import React from 'react';
import './App.css';
import {useActiveVkuiLocation, useGetPanelForView} from "@vkontakte/vk-mini-apps-router";
import {Panel, Root, View} from "@vkontakte/vkui";
import {useGetNewsItemsQuery} from "./entities/news";
import News from "./pages/news";

function App() {
    const {view: activeView} = useActiveVkuiLocation() as { view: string };
    const activePanel = useGetPanelForView('default_view') as string;

    return (
        <Root activeView={activeView}>
            <View nav="news" activePanel={activePanel}>
                <Panel nav="news"><News/></Panel>
                <Panel nav="news_panel"><News/></Panel>
            </View>
        </Root>
    )
}

export default App;
