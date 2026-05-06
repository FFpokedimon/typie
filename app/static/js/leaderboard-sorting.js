function leaderboardSorting() {
    return {
        leaders: [
            { name: 'Алексей М.', grade: '5-7', score: 12500, rank: 1 },
            { name: 'Мария К.', grade: '8-11', score: 11200, rank: 2 },
            { name: 'Дмитрий С.', grade: '3', score: 9800, rank: 3 },
            { name: 'Анна П.', grade: '2', score: 8700, rank: 4 },
            { name: 'Иван Т.', grade: '1', score: 7500, rank: 5 },
            { name: 'Елена В.', grade: '4', score: 6300, rank: 6 },
            { name: 'Сергей Л.', grade: '8-11', score: 5100, rank: 7 },
            { name: 'Ольга Н.', grade: 'Дошкольник', score: 3900, rank: 8 },
            { name: 'Алексей М.', grade: '5-7', score: 3800, rank: 9 },
            { name: 'Мария К.', grade: '8-11', score: 3700, rank: 10 },
            { name: 'Дмитрий С.', grade: '3', score: 3600, rank: 11 },
            { name: 'Анна П.', grade: '2', score: 3500, rank: 12 }, { name: 'Анна П.', grade: '2', score: 3400, rank: 13 }, { name: 'Анна П.', grade: '2', score: 3300, rank: 14 }, { name: 'Анна П.', grade: '2', score: 3200, rank: 15 }
        ],
        searchName: '',
        filterGrade: '',
        sortKey: 'score',
        sortAsc: false,
        gradeOrder: ['Дошкольник', '1', '2', '3', '4', '5-7', '8-11'],
        sortBy(key) {
            if (this.sortKey === key) {
                this.sortAsc = !this.sortAsc;
            } else {
                this.sortKey = key;
                this.sortAsc = key === 'name' || key === 'grade';
            }
            const dir = this.sortAsc ? 1 : -1;
            this.leaders.sort((a, b) => {
                let valA = a[key], valB = b[key];
                if (key === 'grade') {
                    valA = this.gradeOrder.indexOf(valA);
                    valB = this.gradeOrder.indexOf(valB);
                    return (valA - valB) * dir;
                }
                if (typeof valA === 'string') {
                    return valA.localeCompare(valB, 'ru') * dir;
                }
                return (valA - valB) * dir;
            });
        },
        getArrow(key) {
            if (this.sortKey !== key) return 'mobiledata_arrows';
            return this.sortAsc ? 'arrow_downward' : 'arrow_upward';
        },
        getRankBadge(rank) {
            if (rank === 1) return '🥇';
            if (rank === 2) return '🥈';
            if (rank === 3) return '🥉';
            return rank;
        },
        getRowClass(rank) {
            if (rank === 1) return 'bg-yellow-500/10';
            if (rank === 2) return 'bg-gray-400/10';
            if (rank === 3) return 'bg-amber-700/10';
            return '';
        },
        getRankColorClass(rank) {
            if (rank === 1) return 'text-yellow-400';
            if (rank === 2) return 'text-gray-400';
            if (rank === 3) return 'text-amber-600';
            return 'text-gray-300';
        },
        get filteredAndSortedLeaders() {
            let filtered = this.leaders.filter(player => {
                const matchName = player.name.toLowerCase().includes(this.searchName.toLowerCase());
                const matchGrade = this.filterGrade === '' || this.filterGrade === 'Все' || player.grade === this.filterGrade;
                return matchName && matchGrade;
            });
            const sorted = filtered.sort((a, b) => {
                let valA = a[this.sortKey], valB = b[this.sortKey];
                const dir = this.sortAsc ? 1 : -1;
                if (this.sortKey === 'grade') {
                    valA = this.gradeOrder.indexOf(valA);
                    valB = this.gradeOrder.indexOf(valB);
                    return (valA - valB) * dir;
                }
                if (typeof valA === 'string') {
                    return valA.localeCompare(valB, 'ru') * dir;
                }
                return (valA - valB) * dir;
            });
            return sorted;
        }
    };
}