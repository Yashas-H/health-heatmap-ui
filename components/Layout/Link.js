import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import _ from 'underscore';

export default ({ href, children }) => {
	const router = useRouter();

	let className = children.props.className || '';
	const h = _.isObject(href) ? href.pathname : href;
	if (router.pathname === h) {
		className = `${className} selected`;
	}

	return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
};
