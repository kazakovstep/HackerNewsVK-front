import {useGetNewsItemsQuery} from "../../entities/news";
import {
    Avatar,
    Card,
    CardGrid,
    Div,
    Group,
    SimpleCell,
    Text,
    Title,
    Spacing,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import React, {useEffect} from "react";
import {Icon28User} from "@vkontakte/icons";
import {useLocation} from "@vkontakte/vk-mini-apps-router/dist/hooks/hooks";

export default function News() {
    const {data: news, isLoading, error} = useGetNewsItemsQuery();

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         window.location.reload();
    //     }, 10000);
    //
    //     return () => clearInterval(intervalId);
    // }, []);

    if (isLoading) return <Div>Загрузка...</Div>;
    if (error) return <Div>Ошибка: {error?.toString()}</Div>;

    return (
        <>
            {news?.map((item) => (
                <Group key={item.id} mode="plain">
                    <CardGrid size="l">
                        <Card mode="outline">
                            <Div>
                                <SimpleCell before={<Avatar fallbackIcon={<Icon28User/>}/>}
                                            after={`Оценка: ${item.score}`}>
                                    {item.by}
                                </SimpleCell>
                                <Spacing size={8}/>
                                <Title level="2" weight="2">
                                    {item.title}
                                </Title>
                                <Spacing size={16}/>
                                <Text weight="1">
                                    {item.time}
                                </Text>
                            </Div>
                        </Card>
                    </CardGrid>
                </Group>
            ))}
        </>
    );
}