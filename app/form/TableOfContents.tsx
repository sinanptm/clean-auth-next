import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TableOfContentsProps {
    onNavigate: (sectionId: string) => void;
}

const sections = [
    {
        id: 'personal-info',
        icon: '👤',
        title: 'Personal Information',
        description: 'Basic details & biography',
        fieldCount: 4,
    },
    {
        id: 'account-file-upload',
        icon: '🔐',
        title: 'Account & File Upload',
        description: 'Login credentials and profile',
        fieldCount: 2,
    },
    {
        id: 'location-identity',
        icon: '🌍',
        title: 'Location & Identity',
        description: 'Country & gender',
        fieldCount: 2,
    },
    {
        id: 'professional',
        icon: '💼',
        title: 'Professional Info',
        description: 'Skills & experience',
        fieldCount: 6,
    },
    {
        id: 'communication',
        icon: '💬',
        title: 'Communication',
        description: 'Messages & feedback',
        fieldCount: 3,
    },
    {
        id: 'preferences',
        icon: '⚙️',
        title: 'Preferences & Settings',
        description: 'Notifications & agreements',
        fieldCount: 6,
    }
];

const TableOfContents = ({ onNavigate }: TableOfContentsProps) => {
    return (
        <Card className="mb-12">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    📋 Form Sections
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {sections.map((section) => (
                        <Button
                            key={section.id}
                            variant="outline"
                            onClick={() => onNavigate(section.id)}
                            className="h-auto p-4 justify-start text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            <div className="flex items-center gap-3 w-full">
                                <span className="text-lg shrink-0">{section.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm truncate">
                                        {section.title}
                                    </div>
                                    <div className="text-xs text-muted-foreground truncate">
                                        {section.description}
                                    </div>
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default TableOfContents;
