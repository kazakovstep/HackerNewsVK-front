import {useGetNewsItemsQuery} from "../../entities/news";
import {Div} from "@vkontakte/vkui";
import React, {useEffect} from "react";
import NewsPreview from "../../entities/news/ui";
import Loading from "../../shared/Loading/Loading";

export default function News() {
    const {data: news, isLoading, error} = useGetNewsItemsQuery();

    useEffect(() => {
        const intervalId = setInterval(() => {
            window.location.reload();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    if (isLoading) return <Loading/>;

    if (error) return <Div>Ошибка: {error?.toString()}</Div>;

    return (
        <>
            {news?.map((item) => (
                <NewsPreview item={item}></NewsPreview>
            ))}
        </>
    );
}