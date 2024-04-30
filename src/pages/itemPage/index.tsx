import {useLocation} from "@vkontakte/vk-mini-apps-router/dist/hooks/hooks";
import {formatUnixTimeToDateTime, useGetNewsItemByIdQuery} from "../../entities/news";
import {Avatar, Button, Cell, Counter, Div, Group, Link, Paragraph, Text, Title} from "@vkontakte/vkui";
import React from "react";
import {Icon24ChevronLeft, Icon24LogoVk, Icon24MessageOutline} from "@vkontakte/icons";
import CommentsTree from "../../shared/CommentTree/CommentTree";
import CommentTree from "../../shared/CommentTree/CommentTree";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

export default function ItemPage() {

    const location = useLocation();

    const newsId = Number(location.pathname.split('/')[2]);

    const {data: news, isLoading, error} = useGetNewsItemByIdQuery(newsId);

    const routeNavigator = useRouteNavigator();

    return (
        <>
            <Group>
                <Div>
                    <Button appearance={"accent"} onClick={() => routeNavigator.push("/")}><Icon24ChevronLeft height={16}/> Назад к новостям</Button>
                </Div>
                <Div>
                    <Title level={"1"} weight={"2"}>{news?.title}</Title>
                </Div>
                <Div>
                    <Text weight={"1"}>Автор: {news?.by}</Text>
                    <Text weight={"1"}>Опубликовано: {formatUnixTimeToDateTime(String(news?.time))}</Text>
                </Div>
                <Div>
                    <Paragraph>{news?.text}</Paragraph>
                </Div>
                <Div>
                    <Link href={`${news?.url}`} target="_blank">
                        Ссылка на новость
                    </Link>
                </Div>
                <Div>
                    <Cell
                        before={<Avatar fallbackIcon={<Icon24MessageOutline/>} size={32}/>}
                        badgeAfterSubtitle={`Автор: ${news?.by}`}
                        after={<Counter>{news?.descendants}</Counter>}
                    >
                        Комментарии
                    </Cell>
                </Div>
                <CommentTree newsId={Number(news?.id)}/>
            </Group>
        </>
    );
}