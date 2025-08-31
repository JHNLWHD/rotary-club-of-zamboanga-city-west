import { Link } from "@chakra-ui/react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
  [key: string]: any;
};

export function ButtonLink({ href, children, isExternal, ...props }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      bg="brand.500"
      color="white"
      fontWeight="bold"
      px={6}
      py={3}
      borderRadius="md"
      _hover={{ bg: "brand.700" }}
      style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    >
      {children}
    </Link>
  );
} 