
import { CircleX } from "lucide-react-native";
import React, { PropsWithChildren } from "react";
import LoadingView from "./LoadingView";
import MessageView from "./MessageView";

interface RequestResultsViewProps extends PropsWithChildren {
    isPending: boolean;
    isError: boolean;
    hasData: boolean;
    hasSearch?: boolean;
    ErrorComponent?: React.ReactNode,
    NotFoundComponent?: React.ReactNode;
    EmptyComponent?: React.ReactNode;
}

export default function RequestResultsView({
    children,
    hasSearch = false,
    NotFoundComponent,
    EmptyComponent,
    ErrorComponent,
    ...request
}: RequestResultsViewProps) {

    if (request.isPending)
        return <LoadingView />;

    if (request.isError)
        return <>
            {ErrorComponent
                || <MessageView
                    icon={CircleX}
                    message="Ocorreu um erro!"
                    description='Estamos resolvendo, tente novamente mais tarde.' />}
        </>

    if (request.hasData)
        return <>{children}</>;


    if (hasSearch)
        return <>{NotFoundComponent
            || <MessageView message="Sem resultados" description="Que pena! Não encontramos o que você procura!" />}</>;


    return <>{EmptyComponent ||
        <MessageView
            message="Sem resultados"
            description="Que pena! Não encontramos o que você procura!" />}</>;


}

