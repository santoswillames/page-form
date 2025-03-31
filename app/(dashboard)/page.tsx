import { ReactNode, Suspense } from "react";

import { GetForms, GetFormStats } from "../actions/form";

import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import CreateFormBtn from "@/components/create-form-btn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form } from "@prisma/client";
import {
  ArrowRight,
  Edit,
  MousePointer,
  Send,
  Split,
  View,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Seus Formulários</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards({ loading, data }: StatsCardsProps) {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total de visitas"
        icon={<View className="text-blue-600" />}
        helperText="Total de visitas ao formulário"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />

      <StatsCard
        title="Total de submissões"
        icon={<Send className="text-yellow-600" />}
        helperText="Total de submissões ao formulário"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="Taxa de submissões"
        icon={<MousePointer className="text-green-600" />}
        helperText="Visitas que resultam no envio de formulários"
        value={data?.submissionsRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Taxa de rejeição"
        icon={<Split className="text-red-600" />}
        helperText="Visitas que saem sem interagir"
        value={data?.submissionsRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  helperText: string;
  className: string;
  loading: boolean;
  icon: ReactNode;
}

function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton className="bg-zinc-800">
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary/20 h-[220px] w-full" />;
}

async function FormCards() {
  const forms = await GetForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold max-w-[240px]">{form.name}</span>
          {form.published && <Badge>Públicado</Badge>}
          {!form.published && <Badge variant={"destructive"}>Rascunho</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
            locale: ptBR,
          })}
          {!form.published && (
            <span className="flex items-center gap-2">
              <View className="text-muted-foreground size-4" />
              <span>{form.visits.toLocaleString()}</span>
              <Send className="text-muted-foreground size-4" />
              <span>{form.visits.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "Sem descrição"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/forms/${form.id}`}>
              Ver Submissões <ArrowRight />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            variant={"secondary"}
            asChild
            className="w-full mt-2 text-md gap-4"
          >
            <Link href={`/builder/${form.id}`}>
              Editar <Edit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
