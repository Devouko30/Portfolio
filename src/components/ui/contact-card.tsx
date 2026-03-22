import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, PlusIcon } from 'lucide-react';

type ContactInfoProps = React.ComponentProps<'div'> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = 'Contact With Us',
  description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        'relative grid h-full w-full md:grid-cols-2 lg:grid-cols-3',
        'glass rounded-2xl overflow-hidden',
        className,
      )}
      {...props}
    >
      {/* Corner plus icons */}
      <PlusIcon className="absolute -top-3 -left-3 h-5 w-5 text-[#cc005f]/60" />
      <PlusIcon className="absolute -top-3 -right-3 h-5 w-5 text-[#cc005f]/60" />
      <PlusIcon className="absolute -bottom-3 -left-3 h-5 w-5 text-[#cc005f]/60" />
      <PlusIcon className="absolute -right-3 -bottom-3 h-5 w-5 text-[#cc005f]/60" />

      {/* Left / info panel */}
      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-6 px-6 py-10 md:p-10">
          <h1 className="text-3xl font-extralight tracking-wide text-white md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl text-sm font-light leading-relaxed text-white/40 md:text-base">
            {description}
          </p>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {contactInfo?.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
          </div>
        </div>
      </div>

      {/* Right / form panel */}
      <div
        className={cn(
          'flex h-full w-full items-center border-t border-white/5 p-6',
          'md:col-span-1 md:border-t-0 md:border-l',
          'bg-white/[0.02]',
          formSectionClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({ icon: Icon, label, value, className, ...props }: ContactInfoProps) {
  return (
    <div className={cn('flex items-center gap-3 py-3', className)} {...props}>
      <div className="glass-pink rounded-lg p-2.5 flex-shrink-0">
        <Icon className="h-4 w-4 text-[#cc005f]" />
      </div>
      <div>
        <p className="text-xs tracking-[0.15em] uppercase font-light text-white/60">{label}</p>
        <p className="text-sm font-light text-white mt-0.5">{value}</p>
      </div>
    </div>
  );
}
