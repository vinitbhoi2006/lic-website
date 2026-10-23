import React, { useState, useEffect } from 'react';
import {
  Shield,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Users,
  Send,
  Search,
  Filter,
} from 'lucide-react';
import { InsuranceProduct, ProductCategory } from '../../types';
import { apiClient } from '../../api/client';

interface ProductCatalogProps {
  onRequestGuidance: (category: ProductCategory, productTitle: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  ALL: 'All Insurance Categories',
  TERM_INSURANCE: 'Term Insurance',
  WHOLE_LIFE: 'Whole Life Plans',
  ENDOWMENT: 'Endowment Plans',
  MONEY_BACK: 'Money-Back Plans',
  CHILD_FOCUSED: 'Child Education Plans',
  RETIREMENT_PENSION: 'Pension & Annuity',
  ULIP: 'Unit-Linked (ULIP)',
  GROUP_INSURANCE: 'Group Schemes',
};

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onRequestGuidance }) => {
  const [products, setProducts] = useState<InsuranceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await apiClient.getProducts();
        if (res.data?.products) {
          setProducts(res.data.products);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load verified insurance catalogue.');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="plans" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Verified LIC Product Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight">
            Explore Life Insurance Options
          </h2>
          <p className="mt-3 text-sm text-content-secondary leading-relaxed">
            All presented plan details are verified directly against official Life Insurance Corporation of India (LIC) documentation.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === key
                    ? 'bg-navy-800 text-white shadow-sm'
                    : 'bg-surface-bg text-content-secondary hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search plans or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-50 h-80 rounded-2xl animate-pulse border border-gray-100"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="p-8 text-center bg-red-50 text-status-error rounded-2xl border border-red-200">
            <p className="font-semibold text-sm">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-subtle hover:shadow-premium transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top */}
                <div className="p-6">
                  {/* Category Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                      {product.category.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[11px] text-content-secondary flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      Verified {new Date(product.lastVerifiedDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-800 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-accent-gold-dark font-medium mt-1">
                    {product.tagline}
                  </p>
                  <p className="text-xs text-content-secondary mt-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Target Audience */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-start gap-2 text-xs text-content-primary">
                    <Users className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[11px] text-content-secondary block">
                        Suited For:
                      </span>
                      <span className="text-xs">{product.intendedAudience}</span>
                    </div>
                  </div>

                  {/* Verified Features List */}
                  <div className="mt-4 space-y-2">
                    <span className="text-[11px] font-bold text-navy-800 uppercase tracking-wide block">
                      Verified Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-content-secondary">
                      {product.keyFeatures.slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom: Actions & Source */}
                <div className="p-6 bg-surface-bg border-t border-gray-100 flex flex-col gap-2.5">
                  <button
                    onClick={() => onRequestGuidance(product.category, product.title)}
                    className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl text-xs font-semibold shadow-sm transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Guidance on This Plan</span>
                  </button>

                  <a
                    href={product.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-[11px] text-content-secondary hover:text-navy-800 flex items-center justify-center gap-1 transition"
                  >
                    <span>View Official LIC Brochure</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
