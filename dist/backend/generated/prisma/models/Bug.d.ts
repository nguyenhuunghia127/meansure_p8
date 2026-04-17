import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BugModel = runtime.Types.Result.DefaultSelection<Prisma.$BugPayload>;
export type AggregateBug = {
    _count: BugCountAggregateOutputType | null;
    _min: BugMinAggregateOutputType | null;
    _max: BugMaxAggregateOutputType | null;
};
export type BugMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    severity: $Enums.Severity | null;
    environment: $Enums.Environment | null;
    reportedAt: Date | null;
    resolvedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BugMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    severity: $Enums.Severity | null;
    environment: $Enums.Environment | null;
    reportedAt: Date | null;
    resolvedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BugCountAggregateOutputType = {
    id: number;
    title: number;
    severity: number;
    environment: number;
    reportedAt: number;
    resolvedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BugMinAggregateInputType = {
    id?: true;
    title?: true;
    severity?: true;
    environment?: true;
    reportedAt?: true;
    resolvedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BugMaxAggregateInputType = {
    id?: true;
    title?: true;
    severity?: true;
    environment?: true;
    reportedAt?: true;
    resolvedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BugCountAggregateInputType = {
    id?: true;
    title?: true;
    severity?: true;
    environment?: true;
    reportedAt?: true;
    resolvedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BugAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BugWhereInput;
    orderBy?: Prisma.BugOrderByWithRelationInput | Prisma.BugOrderByWithRelationInput[];
    cursor?: Prisma.BugWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BugCountAggregateInputType;
    _min?: BugMinAggregateInputType;
    _max?: BugMaxAggregateInputType;
};
export type GetBugAggregateType<T extends BugAggregateArgs> = {
    [P in keyof T & keyof AggregateBug]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBug[P]> : Prisma.GetScalarType<T[P], AggregateBug[P]>;
};
export type BugGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BugWhereInput;
    orderBy?: Prisma.BugOrderByWithAggregationInput | Prisma.BugOrderByWithAggregationInput[];
    by: Prisma.BugScalarFieldEnum[] | Prisma.BugScalarFieldEnum;
    having?: Prisma.BugScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BugCountAggregateInputType | true;
    _min?: BugMinAggregateInputType;
    _max?: BugMaxAggregateInputType;
};
export type BugGroupByOutputType = {
    id: string;
    title: string;
    severity: $Enums.Severity;
    environment: $Enums.Environment;
    reportedAt: Date;
    resolvedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: BugCountAggregateOutputType | null;
    _min: BugMinAggregateOutputType | null;
    _max: BugMaxAggregateOutputType | null;
};
export type GetBugGroupByPayload<T extends BugGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BugGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BugGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BugGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BugGroupByOutputType[P]>;
}>>;
export type BugWhereInput = {
    AND?: Prisma.BugWhereInput | Prisma.BugWhereInput[];
    OR?: Prisma.BugWhereInput[];
    NOT?: Prisma.BugWhereInput | Prisma.BugWhereInput[];
    id?: Prisma.StringFilter<"Bug"> | string;
    title?: Prisma.StringFilter<"Bug"> | string;
    severity?: Prisma.EnumSeverityFilter<"Bug"> | $Enums.Severity;
    environment?: Prisma.EnumEnvironmentFilter<"Bug"> | $Enums.Environment;
    reportedAt?: Prisma.DateTimeFilter<"Bug"> | Date | string;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Bug"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Bug"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Bug"> | Date | string;
};
export type BugOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    environment?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BugWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BugWhereInput | Prisma.BugWhereInput[];
    OR?: Prisma.BugWhereInput[];
    NOT?: Prisma.BugWhereInput | Prisma.BugWhereInput[];
    title?: Prisma.StringFilter<"Bug"> | string;
    severity?: Prisma.EnumSeverityFilter<"Bug"> | $Enums.Severity;
    environment?: Prisma.EnumEnvironmentFilter<"Bug"> | $Enums.Environment;
    reportedAt?: Prisma.DateTimeFilter<"Bug"> | Date | string;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Bug"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Bug"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Bug"> | Date | string;
}, "id">;
export type BugOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    environment?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BugCountOrderByAggregateInput;
    _max?: Prisma.BugMaxOrderByAggregateInput;
    _min?: Prisma.BugMinOrderByAggregateInput;
};
export type BugScalarWhereWithAggregatesInput = {
    AND?: Prisma.BugScalarWhereWithAggregatesInput | Prisma.BugScalarWhereWithAggregatesInput[];
    OR?: Prisma.BugScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BugScalarWhereWithAggregatesInput | Prisma.BugScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Bug"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Bug"> | string;
    severity?: Prisma.EnumSeverityWithAggregatesFilter<"Bug"> | $Enums.Severity;
    environment?: Prisma.EnumEnvironmentWithAggregatesFilter<"Bug"> | $Enums.Environment;
    reportedAt?: Prisma.DateTimeWithAggregatesFilter<"Bug"> | Date | string;
    resolvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Bug"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Bug"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Bug"> | Date | string;
};
export type BugCreateInput = {
    id?: string;
    title: string;
    severity?: $Enums.Severity;
    environment?: $Enums.Environment;
    reportedAt?: Date | string;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BugUncheckedCreateInput = {
    id?: string;
    title: string;
    severity?: $Enums.Severity;
    environment?: $Enums.Environment;
    reportedAt?: Date | string;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BugUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    severity?: Prisma.EnumSeverityFieldUpdateOperationsInput | $Enums.Severity;
    environment?: Prisma.EnumEnvironmentFieldUpdateOperationsInput | $Enums.Environment;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BugUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    severity?: Prisma.EnumSeverityFieldUpdateOperationsInput | $Enums.Severity;
    environment?: Prisma.EnumEnvironmentFieldUpdateOperationsInput | $Enums.Environment;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BugCreateManyInput = {
    id?: string;
    title: string;
    severity?: $Enums.Severity;
    environment?: $Enums.Environment;
    reportedAt?: Date | string;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BugUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    severity?: Prisma.EnumSeverityFieldUpdateOperationsInput | $Enums.Severity;
    environment?: Prisma.EnumEnvironmentFieldUpdateOperationsInput | $Enums.Environment;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BugUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    severity?: Prisma.EnumSeverityFieldUpdateOperationsInput | $Enums.Severity;
    environment?: Prisma.EnumEnvironmentFieldUpdateOperationsInput | $Enums.Environment;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BugCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    environment?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BugMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    environment?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BugMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    environment?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EnumSeverityFieldUpdateOperationsInput = {
    set?: $Enums.Severity;
};
export type EnumEnvironmentFieldUpdateOperationsInput = {
    set?: $Enums.Environment;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type BugSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    severity?: boolean;
    environment?: boolean;
    reportedAt?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["bug"]>;
export type BugSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    severity?: boolean;
    environment?: boolean;
    reportedAt?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["bug"]>;
export type BugSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    severity?: boolean;
    environment?: boolean;
    reportedAt?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["bug"]>;
export type BugSelectScalar = {
    id?: boolean;
    title?: boolean;
    severity?: boolean;
    environment?: boolean;
    reportedAt?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BugOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "severity" | "environment" | "reportedAt" | "resolvedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["bug"]>;
export type $BugPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Bug";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        severity: $Enums.Severity;
        environment: $Enums.Environment;
        reportedAt: Date;
        resolvedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["bug"]>;
    composites: {};
};
export type BugGetPayload<S extends boolean | null | undefined | BugDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BugPayload, S>;
export type BugCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BugFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BugCountAggregateInputType | true;
};
export interface BugDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Bug'];
        meta: {
            name: 'Bug';
        };
    };
    findUnique<T extends BugFindUniqueArgs>(args: Prisma.SelectSubset<T, BugFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BugClient<runtime.Types.Result.GetResult<Prisma.$BugPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BugFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BugFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BugClient<runtime.Types.Result.GetResult<Prisma.$BugPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BugFindFirstArgs>(args?: Prisma.SelectSubset<T, BugFindFirstArgs<ExtArgs>>): Prisma.Prisma__BugClient<runtime.Types.Result.GetResult<Prisma.$BugPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BugFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BugFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BugClient<runtime.Types.Result.GetResult<Prisma.$BugPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BugFindManyArgs>(args?: Prisma.SelectSubset<T, BugFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BugPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BugCreateArgs>(args: Prisma.SelectSubset<T, BugCreateArgs<ExtArgs>>): Prisma.Prisma__BugClient<runtime.Types.Result.GetResult<Prisma.$BugPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BugCreateManyArgs>(args?: Prisma.SelectSubset<T, BugCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BugCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BugCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BugPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BugDeleteArgs>(args: Prisma.SelectSubset<T, BugDeleteArgs<ExtArgs>>): Prisma.Prisma__BugClient<runtime.Types.Result.GetResult<Prisma.$BugPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BugUpdateArgs>(args: Prisma.SelectSubset<T, BugUpdateArgs<ExtArgs>>): Prisma.Prisma__BugClient<runtime.Types.Result.GetResult<Prisma.$BugPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BugDeleteManyArgs>(args?: Prisma.SelectSubset<T, BugDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BugUpdateManyArgs>(args: Prisma.SelectSubset<T, BugUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BugUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BugUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BugPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BugUpsertArgs>(args: Prisma.SelectSubset<T, BugUpsertArgs<ExtArgs>>): Prisma.Prisma__BugClient<runtime.Types.Result.GetResult<Prisma.$BugPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BugCountArgs>(args?: Prisma.Subset<T, BugCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BugCountAggregateOutputType> : number>;
    aggregate<T extends BugAggregateArgs>(args: Prisma.Subset<T, BugAggregateArgs>): Prisma.PrismaPromise<GetBugAggregateType<T>>;
    groupBy<T extends BugGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BugGroupByArgs['orderBy'];
    } : {
        orderBy?: BugGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BugGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBugGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BugFieldRefs;
}
export interface Prisma__BugClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BugFieldRefs {
    readonly id: Prisma.FieldRef<"Bug", 'String'>;
    readonly title: Prisma.FieldRef<"Bug", 'String'>;
    readonly severity: Prisma.FieldRef<"Bug", 'Severity'>;
    readonly environment: Prisma.FieldRef<"Bug", 'Environment'>;
    readonly reportedAt: Prisma.FieldRef<"Bug", 'DateTime'>;
    readonly resolvedAt: Prisma.FieldRef<"Bug", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Bug", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Bug", 'DateTime'>;
}
export type BugFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BugSelect<ExtArgs> | null;
    omit?: Prisma.BugOmit<ExtArgs> | null;
    where: Prisma.BugWhereUniqueInput;
};
export type BugFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BugSelect<ExtArgs> | null;
    omit?: Prisma.BugOmit<ExtArgs> | null;
    where: Prisma.BugWhereUniqueInput;
};
export type BugFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BugSelect<ExtArgs> | null;
    omit?: Prisma.BugOmit<ExtArgs> | null;
    where?: Prisma.BugWhereInput;
    orderBy?: Prisma.BugOrderByWithRelationInput | Prisma.BugOrderByWithRelationInput[];
    cursor?: Prisma.BugWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BugScalarFieldEnum | Prisma.BugScalarFieldEnum[];
};
export type BugFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BugSelect<ExtArgs> | null;
    omit?: Prisma.BugOmit<ExtArgs> | null;
    where?: Prisma.BugWhereInput;
    orderBy?: Prisma.BugOrderByWithRelationInput | Prisma.BugOrderByWithRelationInput[];
    cursor?: Prisma.BugWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BugScalarFieldEnum | Prisma.BugScalarFieldEnum[];
};
export type BugFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BugSelect<ExtArgs> | null;
    omit?: Prisma.BugOmit<ExtArgs> | null;
    where?: Prisma.BugWhereInput;
    orderBy?: Prisma.BugOrderByWithRelationInput | Prisma.BugOrderByWithRelationInput[];
    cursor?: Prisma.BugWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BugScalarFieldEnum | Prisma.BugScalarFieldEnum[];
};
export type BugCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BugSelect<ExtArgs> | null;
    omit?: Prisma.BugOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BugCreateInput, Prisma.BugUncheckedCreateInput>;
};
export type BugCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BugCreateManyInput | Prisma.BugCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BugCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BugSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BugOmit<ExtArgs> | null;
    data: Prisma.BugCreateManyInput | Prisma.BugCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BugUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BugSelect<ExtArgs> | null;
    omit?: Prisma.BugOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BugUpdateInput, Prisma.BugUncheckedUpdateInput>;
    where: Prisma.BugWhereUniqueInput;
};
export type BugUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BugUpdateManyMutationInput, Prisma.BugUncheckedUpdateManyInput>;
    where?: Prisma.BugWhereInput;
    limit?: number;
};
export type BugUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BugSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BugOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BugUpdateManyMutationInput, Prisma.BugUncheckedUpdateManyInput>;
    where?: Prisma.BugWhereInput;
    limit?: number;
};
export type BugUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BugSelect<ExtArgs> | null;
    omit?: Prisma.BugOmit<ExtArgs> | null;
    where: Prisma.BugWhereUniqueInput;
    create: Prisma.XOR<Prisma.BugCreateInput, Prisma.BugUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BugUpdateInput, Prisma.BugUncheckedUpdateInput>;
};
export type BugDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BugSelect<ExtArgs> | null;
    omit?: Prisma.BugOmit<ExtArgs> | null;
    where: Prisma.BugWhereUniqueInput;
};
export type BugDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BugWhereInput;
    limit?: number;
};
export type BugDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BugSelect<ExtArgs> | null;
    omit?: Prisma.BugOmit<ExtArgs> | null;
};
