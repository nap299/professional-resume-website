/**
 * Portfolio App Module (Alpine.js)
 * Uses portfolio data from window.portfolioData (loaded via portfolio-data.js)
 */
function portfolioApp() {
    return {
        tabs: ['All', 'Web', 'Desktop', 'Mobile'],
        activeTab: 'All',
        modalOpen: false,
        selectedProject: null,
        projects: [],
        filteredProjects: [],
        init() {
            // Load from global variable (works with both file:// and http://)
            this.projects = window.portfolioData || [];
            this.filteredProjects = [...this.projects];
            this.$nextTick(() => lucide.createIcons());
        },
        filterProjects(tab) {
            this.activeTab = tab;
            if (tab === 'All') {
                this.filteredProjects = [...this.projects];
            } else {
                this.filteredProjects = this.projects.filter(p => p.type === tab);
            }
            this.$nextTick(() => lucide.createIcons());
        },
        openModal(project) {
            this.selectedProject = project;
            this.modalOpen = true;
            document.body.style.overflow = 'hidden';
            this.$nextTick(() => lucide.createIcons());
        },
        closeModal() {
            this.modalOpen = false;
            document.body.style.overflow = '';
        }
    };
}
