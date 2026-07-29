import { ContentIcon } from '@/components/content-icon';
import { SectionHeader } from '@/components/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { contact } from '@/content';

/** Ported from `source/index.blade.php:321-407`. */
export function Contact() {
    return (
        <section id="contact">
            <div className="bg-muted/50 py-16">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader>{contact.heading}</SectionHeader>

                    <p className="text-muted-foreground mb-12 text-center">{contact.intro}</p>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card>
                            <CardContent>
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full">
                                        <ContentIcon
                                            name={contact.person.icon}
                                            className="size-5"
                                        />
                                    </div>
                                    <p className="text-lg font-bold">{contact.person.name}</p>
                                </div>

                                <div className="space-y-1">
                                    {contact.person.methods.map((method) => (
                                        <a
                                            key={method.href}
                                            href={method.href}
                                            {...(method.external
                                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                                : {})}
                                            className="hover:bg-muted -mx-3 flex items-center gap-3 rounded-lg px-3 py-1.5 transition-colors"
                                        >
                                            <ContentIcon
                                                name={method.icon}
                                                className="size-4 shrink-0"
                                            />
                                            <span className="text-muted-foreground text-sm">
                                                {method.label}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full">
                                        <ContentIcon
                                            name={contact.address.icon}
                                            className="size-5"
                                        />
                                    </div>
                                    <p className="text-lg font-bold">{contact.address.heading}</p>
                                </div>

                                <div className="text-muted-foreground space-y-1 text-sm">
                                    {contact.address.lines.map((line) => (
                                        <p key={line}>{line}</p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardContent>
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full">
                                        <ContentIcon
                                            name={contact.details.icon}
                                            className="size-5"
                                        />
                                    </div>
                                    <p className="text-lg font-bold">{contact.details.heading}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    {contact.details.fields.map((field) => (
                                        <div key={field.label}>
                                            <p className="mb-1 text-xs font-semibold tracking-wider uppercase">
                                                {field.label}
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                {field.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
